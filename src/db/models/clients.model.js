import mongoose from "mongoose";

const clientSchema = new mongoose.Schema ({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true, 
    },
    email:{
        type: String,
        required: true, 
        index: true, 
    },
    gender:{
        type: String,
        required: true, 
    },
    calification:{
        last_name:{
            type: Number,
            required: true, 
        },
    }
})

export const clientsModel = mongoose.model("Clients", clientSchema); 