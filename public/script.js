// Helper to post JSON
async function postData(url, data) {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

// ----------------- SIGNUP -----------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirm = document.getElementById("confirm").value.trim();

        if (password !== confirm) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // ✅ Signup successful → redirect to home page
                window.location.href = "/index.html";
            } else {
                // Show backend error message
                document.getElementById("signupMsg").innerText = data.message || "Signup failed";
            }
        } catch (err) {
            console.error(err);
            document.getElementById("signupMsg").innerText = "Something went wrong. Please try again.";
        }
    });
}

// ----------------- LOGIN -----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(e.target));
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (res.ok) {
                // ✅ Login successful → redirect to home page
                // Optionally, save token
                localStorage.setItem("token", data.token);
                window.location.href = "/index.html";
            } else {
                // Show error
                document.getElementById("loginMsg").innerText = data.message || "Login failed";
            }
        } catch (err) {
            console.error(err);
            document.getElementById("loginMsg").innerText = "Something went wrong. Please try again.";
        }
    });
}

// ----------------- FORGOT PASSWORD -----------------
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(e.target));
        const msg = await postData("/api/auth/forgot-password", body);
        document.getElementById("forgotMsg").innerText = msg.message || msg.error;
    });
}

// ----------------- RESET PASSWORD -----------------
const resetForm = document.getElementById("resetForm");
if (resetForm) {
    resetForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const body = Object.fromEntries(new FormData(e.target));
        const msg = await postData(`/api/auth/reset-password/${token}`, body);
        document.getElementById("resetMsg").innerText = msg.message || msg.error;
    });
}