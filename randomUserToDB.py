import random
import string
from faker import Faker
import bcrypt
from pymongo import MongoClient
from datetime import datetime

# Thông tin kết nối MongoDB
MONGO_URL = "mongodb+srv://trungnghia24904:softwear123@softwear.61ir3.mongodb.net/?retryWrites=true&w=majority&appName=SoftWear"

# Khởi tạo Faker
fake = Faker()

# Kết nối MongoDB
client = MongoClient(MONGO_URL)
db = client["test"]  # Thay tên database nếu cần
users_collection = db["users"]

# Hàm tạo mật khẩu ngẫu nhiên và mã hóa bcrypt
def generate_password():
    while True:
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        if (any(c.islower() for c in password) and
            any(c.isupper() for c in password) and
            any(c.isdigit() for c in password)):
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(10))
            return password, hashed.decode('utf-8')

# Tạo ngẫu nhiên người dùng
users = []
with open("users_credentials.txt", "w") as file:
    for _ in range(100):
        name = fake.name()
        email = f"{fake.unique.email().split('@')[0]}@gmail.com"
        password, hashed_password = generate_password()
        role = random.choice(["admin", "customer", "retailer"])
        birthday = fake.date_of_birth(tzinfo=None, minimum_age=18, maximum_age=70).strftime("%d/%m/%Y")
        gender = random.choice(["male", "female", None])
        avatar = str(random.randint(1, 5))  # Giả sử avatar là số từ 1 đến 5
        region = fake.city()


        # Lưu thông tin vào MongoDB
        user = {
            "name": name,
            "email": email,
            "password": hashed_password,
            "order_list": [],
            "role": role,
            "birthday": birthday,
            "gender": gender,
            "avatar": avatar,
            "region": region,
        }
        users.append(user)

        # Ghi email và mật khẩu (dạng gốc) vào file
        file.write(f"{email} | {password}\n")

# Đẩy dữ liệu vào MongoDB
if users:
    users_collection.insert_many(users)
    print(f"Đã thêm {len(users)} người dùng vào MongoDB.")
else:   
    print("Không có người dùng để thêm.")