import inquirer from "inquirer";

class student {
  id: string;
  name: string;
  courses: string[];
  fees: number;

  constructor(id: string, name: string, courses: string[], fees: number) {
    this.id = id;
    this.name = name;
    this.courses = courses;
    this.fees = fees;
  }
}

let baseid = 10000;
let studentId: string = "";
let enrollment: boolean = true;

let students: student[] = [];

do {
  let action = await inquirer.prompt({
    name: "answer",
    type: "list",
    message: "Please select an option:",
    choices: ["Course Enrollment", "Student Status"],
  });

  if (action.answer === "Course Enrollment") {
    let studentName = await inquirer.prompt({
      name: "Name",
      type: "input",
      message: "Please enter your name:",
    });

    let trimStudentName = studentName.Name.trim().toLowerCase();
    let studentNameCheck = students.map((obj) => obj.name);

    if (studentNameCheck.includes(trimStudentName) === false) {
      if (trimStudentName !== "") {
        baseid++;
        studentId = "STID" + baseid;

        console.log("Your account has been created");
        console.log(`Welcome, ${trimStudentName}`);

        let Course = await inquirer.prompt({
          name: "Courses",
          type: "list",
          message: "Please select your desiginated course",
          choices: ["Engineering", "Business", "IT", "Arts"],
        });

        let courseFees = 0;
        switch (Course.Courses) {
          case "Engineering":
            courseFees = 5000;
            break;

          case "Business":
            courseFees = 4000;
            break;

          case "IT":
            courseFees = 6000;
            break;

          case "Arts":
            courseFees = 3000;
            break;
        }

        let courseConfirm = await inquirer.prompt({
          name: "courseConfirmation",
          type: "confirm",
          message: "Do you want to enroll in this course",
        });

        if (courseConfirm.courseConfirmation === true) {
          let Student = new student(studentId, trimStudentName, [Course.Courses], courseFees);

          students.push(Student)

          console.log("You have enrolled in this course");

        }
      } else {
        console.log("Invalid name");
      }
    } else {
      console.log("This name already exists");
    }
  }
  else if (action.answer === "Student Status") {
    if (students.length !== 0) {
      let studentNameCheck = students.map(e => e.name)

      let selectedStudent = await inquirer.prompt({
        type: "list",
        name: "students",
        message: "Select your name:",
        choices: studentNameCheck
      })

      let foundStudent = students.find(Student => Student.name === selectedStudent.students)

      console.log("Student information");
      console.log(foundStudent);
    } else {
      console.log("Empty Record");
    }
  }
  let userConfirm = await inquirer.prompt({
    type: "confirm",
    name: "answer",
    message: "Do you want to continue?",
  })
  if (userConfirm.answer === false) {
    enrollment = false
  }
} while (enrollment)
