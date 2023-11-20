const Doc = require("../RoueModel/DocModel")
const sendEmail = require("../utils/email")
const User = require("../RoueModel/UserModel")
exports.CreateDoc = async(req, res)=>{
    // console.log("Hello")
    if(req.params.UserId){
    const data = {
        Title: 'Untitled Document',
        CreatedBy: req.params.UserId
    }
    const NewDoc = new Doc({...data})
    await NewDoc.save();
    res.status(201).json({
        status:"success",
        message: "sucessfully created!",
        Doc: NewDoc
      })
    }else{
        res.status(400).json({
            status:"Failed!", 
            message: "No userId provided"
          }) 

    }
}

exports.GetAllDoc = async(req, res)=>{
    const UserId = req.params.UserId
    const AllDoc = await Doc.find({CreatedBy:UserId }).sort({ CreatedAt: -1 });
    res.status(201).json({
        message: 'success',
        Docs: AllDoc 
    })
} 
 

exports.DeleteDoc = async(req, res) => { 
    const DocId = req.params.DocId;
    const UserId = req.params.UserId;
    await Doc.findByIdAndDelete(DocId)
    const remainigDoc = await Doc.find({CreatedBy:UserId }).sort({ CreatedAt: -1 });
    res.status(201).json({
        message: 'success',
        Docs: remainigDoc 
    })   
}


exports.GetDoc = async(req, res)=>{ 
    const DocId = req.params.DocId;
    const SearchDoc = await Doc.findById(DocId)
    // console.log(SearchDoc)
    res.status(200).json({
        status: "success",
        Docs: SearchDoc
      })
}

 
exports.EditDoc = async(req, res)=>{
    const DocId = req.params.DocId;
    const DocBody = req.body;
    const Data = {
        Data: DocBody.data
    }
    const UpdateDoc = await Doc.findByIdAndUpdate(DocId, Data)
    // console.log(UpdateDoc)
    res.status(200).json({
        status: 'success',
        // Docs: UpdateDoc 
    })
}


exports.InviteFriends = async(req, res)=>{
    const DocId = req.params.DocId;
    const Arr = req.body;
    // console.log(Arr)
    const UpdateDoc = await Doc.findByIdAndUpdate(DocId, {$push: {InvitedTo:Arr}})
    // console.log(UpdateDoc)
    if(Arr.length){
        Arr.forEach( async(element) => {
            await sendEmail({ 
                Email: element,
                subject: 'Join Google doc Clone', 
                html: `<a href='http://localhost:3000/doc/${DocId}/true'>Invite to goolge Doc</a>`
            }); 
        });
    }
    res.status(200).json({
        status: 'success',  
        // Docs: UpdateDoc 
    })
}

exports.SharedDoc = async(req, res)=>{

    const userId = req.params.UserId
    const user = await User.findById(userId);
    if(user.Email){
        const email = user.Email
        let AllDoc = await Doc.find({ InvitedTo: email }).sort({ CreatedAt: -1 });;
        // console.log(AllDoc)
        res.status(200).json({
            message:"success",
            Docs:AllDoc 
        })

    }else{
        res.status(200).json({
            message: "There is no user of that Id",

        })
    }
}


exports.TitleEdit = async(req, res)=>{
    const DocId =  req.params.DocId;
    const { Title } = req.body; // Destructure Title from req.body
    console.log(Title, "Hello")
    const UpdateDoc = await Doc.findByIdAndUpdate(DocId, {Title: Title},{ new: true })
    res.status(200).json({ 
        message: "success",
        Doc: UpdateDoc 
    })
}


exports.UpdateTitle = async(req, res)=>{
    const DocId =  req.params.DocId;
    const UserId = req.params.UserId;
    const { Title } = req.body;
    console.log(Title, "Hello")
    if(!Title){
        res.status(400).json({ 
            message: "failed"
        })
    }
    await Doc.findByIdAndUpdate(DocId, {Title: Title},{ new: true })
    const remainigDoc = await Doc.find({CreatedBy:UserId }).sort({ CreatedAt: -1 });
    res.status(200).json({ 
        message: "success",
        Docs: remainigDoc 
    })

}