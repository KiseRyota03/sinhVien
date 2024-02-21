// Đối tượng Sinh viên
function Student(id, name, dob, className, gpa) {
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.className = className;
    this.gpa = gpa;
    // Phương thức cập nhật thông tin sinh viên
    this.updateInfo = function(name, dob, className, gpa) {
        this.name = name;
        this.dob = dob;
        this.className = className;
        this.gpa = gpa;
    }
}

// Mảng chứa thông tin sinh viên
let students = [];

function addSampleStudents() {
    const sampleStudents = [
        { id: "SV001", name: "Nguyễn Văn A", dob: "2000-01-01", className: "12A", gpa: 3.5 },
        { id: "SV002", name: "Trần Thị B", dob: "2001-02-02", className: "12B", gpa: 3.2 },
        { id: "SV003", name: "Lê Văn C", dob: "2002-03-03", className: "12C", gpa: 3.8 }
    ];

    // Thêm sinh viên mẫu vào mảng students
    sampleStudents.forEach(function(student) {
        const newStudent = new Student(student.id, student.name, student.dob, student.className, student.gpa);
        students.push(newStudent);
    });

    // Hiển thị thông tin sinh viên lên bảng



    displayStudents();

}

window.onload = function() {
    addSampleStudents();
};


// Hàm thêm sinh viên vào danh sách và hiển thị lên bảng
function addStudent() {
    const studentID = document.getElementById('studentID').value;
    const studentName = document.getElementById('studentName').value;
    const dob = document.getElementById('dob').value;
    const studentClass = document.getElementById('class').value;
    const gpa = parseFloat(document.getElementById('gpa').value);

    // Tạo đối tượng sinh viên mới
    const newStudent = new Student(studentID, studentName, dob, studentClass, gpa);

    // Thêm vào mảng sinh viên
    students.push(newStudent);

    // Hiển thị thông tin sinh viên lên bảng
    displayStudents();

    // Xóa nội dung các input sau khi thêm sinh viên thành công
    document.getElementById('studentForm').reset();
}

// Hàm hiển thị thông tin sinh viên lên bảng
function displayStudents() {
    // Xóa các dòng cũ trước khi hiển thị
    const tableBody = document.getElementById('studentTableBody');
    tableBody.innerHTML = '';


    // Duyệt qua mảng sinh viên và hiển thị lên bảng
    students.forEach(function(student) {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = student.id;
        row.insertCell(1).innerText = student.name;
        row.insertCell(2).innerText = student.dob;
        row.insertCell(3).innerText = student.className;
        row.insertCell(4).innerText = student.gpa;
        const actionCell = row.insertCell(5); // Create cell for action buttons
        const editIcon = document.createElement('i');
        const deleteIcon = document.createElement('i');
    
        editIcon.classList.add('fas', 'fa-edit');
        deleteIcon.classList.add('fas', 'fa-trash');

        const editButton = document.createElement('button');
        editButton.textContent = '';
        editButton.onclick = function() {
            editStudent(student.id);
        };
        editButton.prepend(editIcon);


       
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '';
        deleteButton.onclick = function() {
            deleteStudent(student.id);
        };

        deleteButton.prepend(deleteIcon);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
    });
}

// Hàm cập nhật thông tin sinh viên
function editStudent(studentID) {
    const student = students.find(s => s.id === studentID);
    if (student) {
        const newName = prompt('Nhập tên mới:', student.name);
        const newDob = prompt('Nhập ngày sinh mới:', student.dob);
        const newClass = prompt('Nhập lớp học mới:', student.className);
        const newGpa = parseFloat(prompt('Nhập điểm GPA mới:', student.gpa));
        
        // Cập nhật thông tin sinh viên
        student.updateInfo(newName, newDob, newClass, newGpa);
        displayStudents();
    } else {
        alert('Không tìm thấy sinh viên!');
    }
}

// Hàm xóa sinh viên
function deleteStudent(studentID) {
    const index = students.findIndex(s => s.id === studentID);
    if (index !== -1) {
        students.splice(index, 1);
        displayStudents();
    } else {
        alert('Không tìm thấy sinh viên!');
    }
}

// Hàm tìm kiếm sinh viên
function searchStudent() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredStudents = students.filter(student => {
        return student.id.toLowerCase().includes(searchTerm) || student.name.toLowerCase().includes(searchTerm);
    });
    displaySearchedStudents(filteredStudents);
}

// Hàm hiển thị kết quả tìm kiếm
function displaySearchedStudents(searchResults) {
    const tableBody = document.getElementById('studentTableBody');
    // Xóa các dòng cũ trước khi hiển thị
    tableBody.innerHTML = '';

    // Duyệt qua danh sách kết quả tìm kiếm và hiển thị lên bảng
    searchResults.forEach(function(student) {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = student.id;
        row.insertCell(1).innerText = student.name;
        row.insertCell(2).innerText = student.dob;
        row.insertCell(3).innerText = student.className;
        row.insertCell(4).innerText = student.gpa;
        const actionCell = row.insertCell(5); // Create cell for action buttons
        const editIcon = document.createElement('i');
        const deleteIcon = document.createElement('i');
    
        editIcon.classList.add('fas', 'fa-edit');
        deleteIcon.classList.add('fas', 'fa-trash');

        const editButton = document.createElement('button');
        editButton.textContent = '';
        editButton.onclick = function() {
            editStudent(student.id);
        };
        editButton.prepend(editIcon);


       
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '';
        deleteButton.onclick = function() {
            deleteStudent(student.id);
        };

        deleteButton.prepend(deleteIcon);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
    });
}