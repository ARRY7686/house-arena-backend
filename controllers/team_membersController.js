import team_members from "../models/team_membersModel.js";
export async function addTeamMember(req, res) {
    try {
        const data = req.body;
        console.log("New team member data: ", data);

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty or invalid"
            });
        }

        const requiredFields = ["name", "role", "email", "description"];
        for (const field of requiredFields) {
            if (!data[field]) {
                return res.status(400).json({
                    success: false,
                    message: `${field} is required`
                });
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }
        const existingMember = await team_members.findOne({ email: data.email });
        if (existingMember) {
            return res.status(409).json({
                success: false,
                message: "A team member with this email already exists"
            });
        }

        const new_team_member = new team_members_get(data);
        await new_team_member.save();

        res.status(201).json({ success: true, message: "New team member added successfully" });
    } catch (e) {
        console.error("Error adding new team member: ", e.message);

        if (e.name === "ValidationError") {
            return res.status(400).json({
            success: false,
            message: "There was an error with the information provided. Please check the details and try again.",
            errors: e.errors
            });
        }

        if (e.name === "MongoError" && e.code === 11000) {
            return res.status(409).json({
            success: false,
            message: "A team member with this email already exists. Please use a different email.",
            errors: e.keyValue
            });
        }

        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function get_team_members(req, res) {
    try {
        const team_members = await team_members_get.find();

        if (!team_members || team_members.length === 0) {
            return res.status(204).json({ success: true, message: "No team members found." });
        }

        res.status(200).json({ success: true, team_members });
    } catch (e) {
        console.error("Error fetching team members: ", e.message);

        if (e.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Wrong Details Provided,Try Again",
                errors: e.message
            });
        }

        res.status(500).json({ success: false, message: "Internal server error" });
    }
}