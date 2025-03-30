import {mongooseConnect} from "@/lib/mongodb";
import {Profile} from "@/models/Profile";


export default async function handler(req, res) {
  await mongooseConnect()

  const {email, password} = req.body;

  try {
    //check if user exist
    const existingUser = await Profile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({error: "User already exists"});
    }

    // create a new user
    const newUser = await Profile.create({email, password});

    res.status(200).json({message: 'User created successfully', user: newUser});
  } catch (err) {
    return res.status(500).json({error: "server error"});
  }
}

