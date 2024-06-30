from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime, time, timedelta
import pytz
import asyncio
from collections import defaultdict

app = FastAPI()

# not needed technically but keep for dev purposes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BERLIN_TZ = pytz.timezone('Europe/Berlin')
today = datetime.now(BERLIN_TZ).date()

start_time = BERLIN_TZ.localize(datetime.combine(today, time(8, 0)))
end_time = BERLIN_TZ.localize(datetime.combine(today, time(15, 0)))
TIME_SLOTS = []



current_time = start_time
while current_time < end_time:
    next_time = current_time + timedelta(minutes=15)
    TIME_SLOTS.append((current_time, next_time))
    current_time = next_time

slot_assignments = {slot: 0 for slot in TIME_SLOTS}
user_assignments = defaultdict(int)
clear_data_task = None

@app.on_event("startup")
async def startup_event():
    global clear_data_task
    clear_data_task = asyncio.create_task(clear_user_assignments_every_60_minutes())

@app.on_event("shutdown")
async def shutdown_event():
    global clear_data_task
    if clear_data_task:
        clear_data_task.cancel()
        try:
            await clear_data_task
        except asyncio.CancelledError:
            pass
        print("Data clearing cancelled")

@app.get("/")
async def root():
    return {"success": True, "message": "Service is Active"}

@app.get("/getTimeSlot")
def get_time_slot(user_name: str = Query(..., alias="q")):
    if user_assignments[user_name] >= 2:
        return {"success": False, "message": f"Please do not spam this service, {user_name}."}

    now = datetime.now(BERLIN_TZ)
    next_slot = None

    for start, end in TIME_SLOTS:
        if start <= now < end and slot_assignments.get((start, end), 0) < 10:
            next_slot = (start, end)
            break

    if not next_slot:
        for start, end in TIME_SLOTS:
            if now < start and slot_assignments.get((start, end), 0) < 10:
                next_slot = (start, end)
                break

    if next_slot:
        slot_assignments[next_slot] += 1
        user_assignments[user_name] += 1
        start_str = next_slot[0].strftime("%I:%M %p")
        end_str = next_slot[1].strftime("%I:%M %p")
        return {
            "success": True,
            "message": f"The closest available time slot for {user_name} is from {start_str} to {end_str}",
            "slotStart": start_str,
            "slotEnd": end_str
        }
    else:
        return {"success": False, "message": "No more time slots available for today"}

async def clear_user_assignments():
    global user_assignments
    user_assignments = defaultdict(int)
    print("Cleared user assignments.")

async def clear_user_assignments_every_60_minutes():
    while True:
        await asyncio.sleep(3600)
        await clear_user_assignments()
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)