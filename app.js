// ======================
// CURRENT USER
// ======================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function isAdmin() {
    return currentUser && currentUser.role === "admin";
}

// ======================
// DATA
// ======================

let users = JSON.parse(localStorage.getItem("users")) || [];

let reservations =
    JSON.parse(localStorage.getItem("reservations")) || [];

let workspaces =
    JSON.parse(localStorage.getItem("workspaces")) || [];

// ======================
// SAVE DATA
// ======================

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function saveReservations() {
    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );
}

function saveWorkspaces() {
    localStorage.setItem(
        "workspaces",
        JSON.stringify(workspaces)
    );
}

// ======================
// RESERVATIONS CRUD
// ======================

// CREATE

function createReservation(user, workspace, date) {

    const reservation = {
        id: Date.now(),
        user,
        workspace,
        date,
        status: "Pending"
    };

    reservations.push(reservation);

    saveReservations();

    return reservation;
}

// READ

function getAllReservations() {
    return reservations;
}

// UPDATE

function editReservation(id, updatedData) {

    const reservation = reservations.find(
        reservation => reservation.id === id
    );

    if (!reservation) return;

    Object.assign(reservation, updatedData);

    saveReservations();
}

// DELETE

function deleteReservation(id) {

    reservations = reservations.filter(
        reservation => reservation.id !== id
    );

    saveReservations();
}

// ======================
// APPROVE / REJECT
// ======================

function approveReservation(id) {

    editReservation(id, {
        status: "Approved"
    });
}

function rejectReservation(id) {

    editReservation(id, {
        status: "Rejected"
    });
}

// ======================
// WORKSPACES CRUD
// ======================

// CREATE

function createWorkspace(name, capacity) {

    const workspace = {
        id: Date.now(),
        name,
        capacity
    };

    workspaces.push(workspace);

    saveWorkspaces();
}

// READ

function getAllWorkspaces() {
    return workspaces;
}

// UPDATE

function editWorkspace(id, updatedData) {

    const workspace = workspaces.find(
        workspace => workspace.id === id
    );

    if (!workspace) return;

    Object.assign(workspace, updatedData);

    saveWorkspaces();
}

// DELETE

function deleteWorkspace(id) {

    workspaces = workspaces.filter(
        workspace => workspace.id !== id
    );

    saveWorkspaces();
}

// ======================
// USERS
// ======================

function getAllUsers() {

    if (!isAdmin()) {
        alert("Access denied");
        return [];
    }

    return users;
}

// ======================
// STATISTICS
// ======================

function getStatistics() {

    return {
        totalUsers: users.length,

        totalReservations:
            reservations.length,

        totalWorkspaces:
            workspaces.length,

        approvedReservations:
            reservations.filter(
                reservation =>
                    reservation.status === "Approved"
            ).length,

        rejectedReservations:
            reservations.filter(
                reservation =>
                    reservation.status === "Rejected"
            ).length,

        pendingReservations:
            reservations.filter(
                reservation =>
                    reservation.status === "Pending"
            ).length
    };
}

// ======================
// SAMPLE DATA
// ======================

if (users.length === 0) {

    users.push(
        {
            id: 1,
            name: "Admin User",
            email: "admin@test.com",
            role: "admin"
        },
        {
            id: 2,
            name: "Employee User",
            email: "employee@test.com",
            role: "employee"
        }
    );

    saveUsers();
}

// ======================
// RENDER RESERVATIONS
// ======================

function renderReservations() {

    const table =
        document.getElementById("reservationsTable");

    if (!table) return;

    table.innerHTML = "";

    reservations.forEach(reservation => {

        table.innerHTML += `
            <tr>
                <td>${reservation.id}</td>
                <td>${reservation.user}</td>
                <td>${reservation.workspace}</td>
                <td>${reservation.date}</td>
                <td>${reservation.status}</td>

                <td>
                    <button onclick="approveReservation(${reservation.id})">
                        Approve
                    </button>

                    <button onclick="rejectReservation(${reservation.id})">
                        Reject
                    </button>

                    <button onclick="deleteReservation(${reservation.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// ======================
// ADMIN CHECK
// ======================

if (isAdmin()) {
    console.log("Admin logged in");
} else {
    console.log("Employee logged in");
}