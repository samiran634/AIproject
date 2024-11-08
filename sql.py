import sqlite3
connection=sqlite3.connect("college.db")
cursor=connection.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS colleges (
    college_id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    contact_info VARCHAR(100)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS college_courses (
    college_id INTEGER,
    course_id INTEGER,
    PRIMARY KEY (college_id, course_id)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS courses (
    course_id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    duration INTEGER,
    fees NUMERIC(10, 2)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS scholarships (
    scholarship_id INTEGER PRIMARY KEY,
    college_id INTEGER,
    name VARCHAR(255),
    eligibility VARCHAR(255),
    amount NUMERIC(10, 2)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS cutoffs (
    cutoff_id INTEGER PRIMARY KEY,
    course_id INTEGER,
    year INTEGER,
    cutoff NUMERIC(5, 2)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS faculty (
    faculty_id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    department VARCHAR(255),
    college_id INTEGER
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS faculty_courses (
    faculty_id INTEGER,
    course_id INTEGER,
    PRIMARY KEY (faculty_id, course_id)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS hostel (
    college_id INTEGER,
    course_id INTEGER,
    boys_hostel_count INTEGER,
    girls_hostel_count INTEGER,
    security_measures VARCHAR(255),
    PRIMARY KEY (college_id, course_id)
);
""")


colleges_data = [
    (1, 'Tech University', '123 Tech Rd, Silicon Valley, CA', '555-1234'),
    (2, 'Business Academy', '456 Commerce St, New York, NY', '555-5678'),
    (3, 'Art Institute', '789 Creative Blvd, Los Angeles, CA', '555-8765'),
    (4, 'Medical School', '321 Health Ave, Boston, MA', '555-4321'),
    (5, 'Engineering College', '654 Engineering Way, Austin, TX', '555-6789')
]
cursor.executemany("INSERT INTO colleges (college_id, name, address, contact_info) VALUES (?, ?, ?, ?);", colleges_data)

college_courses_data = [
    (1, 101),
    (1, 102),
    (2, 201),
    (3, 301),
    (4, 401)
]
cursor.executemany("INSERT INTO college_courses (college_id, course_id) VALUES (?, ?);", college_courses_data)

courses_data = [
    (101, 'Computer Science', 4, 15000.00),
    (102, 'Information Technology', 3, 12000.00),
    (201, 'Business Management', 2, 10000.00),
    (301, 'Fine Arts', 3, 8000.00),
    (401, 'Medicine', 5, 25000.00)
]
cursor.executemany("INSERT INTO courses (course_id, name, duration, fees) VALUES (?, ?, ?, ?);", courses_data)

scholarships_data = [
    (1, 1, 'Tech Excellence Scholarship', 'Top 10% Students', 5000.00),
    (2, 2, 'Business Leadership Grant', 'Financial Need', 3000.00),
    (3, 3, 'Art Future Scholarship', 'Art Competition Winners', 4000.00),
    (4, 4, 'Medical Aid Fund', 'Low Income Families', 7000.00),
    (5, 5, 'Engineering Innovators Scholarship', 'STEM Enthusiasts', 6000.00)
]
cursor.executemany("INSERT INTO scholarships (scholarship_id, college_id, name, eligibility, amount) VALUES (?, ?, ?, ?, ?);", scholarships_data)

cutoffs_data = [
    (1, 101, 2024, 85.00),
    (2, 102, 2024, 80.00),
    (3, 201, 2024, 75.00),
    (4, 301, 2024, 78.00),
    (5, 401, 2024, 90.00)
]
cursor.executemany("INSERT INTO cutoffs (cutoff_id, course_id, year, cutoff) VALUES (?, ?, ?, ?);", cutoffs_data)

faculty_data = [
    (1, 'Dr. Alice Johnson', 'Computer Science', 1),
    (2, 'Mr. Bob Smith', 'Business', 2),
    (3, 'Ms. Claire Brown', 'Fine Arts', 3),
    (4, 'Dr. David Wilson', 'Medicine', 4),
    (5, 'Prof. Eva Davis', 'Engineering', 5)
]
cursor.executemany("INSERT INTO faculty (faculty_id, name, department, college_id) VALUES (?, ?, ?, ?);", faculty_data)

faculty_courses_data = [
    (1, 101),
    (2, 201),
    (3, 301),
    (4, 401),
    (5, 102)
]
cursor.executemany("INSERT INTO faculty_courses (faculty_id, course_id) VALUES (?, ?);", faculty_courses_data)

hostel_data = [
    (1, 101, 150, 100, '24/7 Security, CCTV Surveillance'),
    (2, 201, 80, 50, 'Key Card Access, Security Guards'),
    (3, 301, 60, 40, 'Secure Entry, CCTV Monitoring'),
    (4, 401, 100, 70, 'Round the Clock Security, Emergency Exits'),
    (5, 102, 90, 60, 'Controlled Access, Fire Alarms')
]
cursor.executemany("INSERT INTO hostel (college_id, course_id, boys_hostel_count, girls_hostel_count, security_measures) VALUES (?, ?, ?, ?, ?);", hostel_data)

data=cursor.execute("""select * from colleges""")
for row in data:
    print(row)
connection.commit();
connection.close()