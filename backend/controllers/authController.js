// Import necessary modules and models

const generateToken = (user) => {
    try {
        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "15d",
            }
        );
    } catch (err) {
        throw new Error("Failed to generate token");
    }
};

export const register = async (req, res) => {
    const { email, password, name, role, gender } = req.body;

    try {
        let user;

        if (role.toLowerCase() === "client") {
            user = await User.findOne({ email });
        } else if (role.toLowerCase() === "lawyer") {
            user = await Lawyer.findOne({ email });
        } else {
            throw new Error("Invalid role");
        }

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role.toLowerCase() === "client") {
            user = new User({
                name,
                email,
                password: hashPassword,
                gender,
                role,
            });
        } else if (role.toLowerCase() === "lawyer") {
            user = new Lawyer({
                name,
                email,
                password: hashPassword,
                gender,
                role,
            });
        }

        if (!user) {
            throw new Error("Failed to instantiate user");
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User successfully created",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again.",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user;

        const client = await User.findOne({ email });
        const lawyer = await Lawyer.findOne({ email });

        if (client) {
            user = client;
        } else if (lawyer) {
            user = lawyer;
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }

        const token = generateToken(user);

        const { password: userPassword, role, appointments, ...rest } = user._doc;
        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            token,
            data: { ...rest },
            role,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to login" });
    }
};
