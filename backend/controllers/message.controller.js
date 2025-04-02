import {Conversation} from "../models/conversation.model.js";
// for chatting;
export const sendMessage = async(req,res)=>{
    try{
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;
        
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        });
        // establish the conversation if not yet started 
        if(!conversation){
            conversation = await message.create({
                senderId,
                receiverId,
                message
            });
            if(newMessage) conversation.messages.push(newMessage._id);
            await Promise.all([conversation.save(), newMessage.save()])

            // implement socket.io for real time data transfer

            return res.status(201).json({
                success:true,
                newMessage
            })
        }
    }catch(error){
        console.log(error);
    }
}

export const getMessage = async (req,res)=>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.find({
            participants:{$all:[senderId, receiverId]}
        });
        if(!conversation) return res.status(200).json({success:true, message:[]});

        return res.status(200).json({success:true, messages:conversation.messages});
    } catch (error) {
        console.log(error);
    }
}