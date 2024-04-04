import User from "../models/UserSchema.js";
import Lawyer from "../models/LawyerSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
    try {
        // Get currently booked lawyer
        const lawyer = await Lawyer.findById(req.params.lawyerId);
        const user = await User.findById(req.userId);


        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/lawyers/${lawyer.id}`,
            customer_email: user.email,
            client_reference_id: req.params.lawyerId,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: 1 * 100,
                        product_data: {
                            name: lawyer.name,
                            description: lawyer.bio,
                            images: [lawyer.photo]
                        }
                    },
                    quantity: 1
                }
            ]
        });

        // Create new booking
        const booking = new Booking({
            Lawyer: lawyer._id,
            user: user._id,
            ticketPrice: 1*100,
            session: session.id
        });

        await booking.save();

        res.status(200).json({ success: true, message: "Successfully paid", session });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
        console.log(err)
    }
};
