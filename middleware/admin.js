const isAdmin = (req, res, next) => {
    const admin = req.body.admin;
    if (admin === "true") {
        req.admin = true;
        next();
    } else {
        req.admin = false;
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = isAdmin;
