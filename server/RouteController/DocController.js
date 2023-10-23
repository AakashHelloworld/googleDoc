const Doc = require("../RoueModel/DocModel")
const sendEmail = require("../utils/email")

exports.CreateDoc = async(req, res)=>{
    console.log("Hello")
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
    const AllDoc = await Doc.find({CreatedBy:UserId })
    res.status(201).json({
        message: 'success',
        Docs: AllDoc 
    })
} 
 

exports.DeleteDoc = async(req, res) => { 
    const DocId = req.params.DocId;
    const UserId = req.params.UserId;
    await Doc.findByIdAndDelete(DocId)
    const remainigDoc = await Doc.find({CreatedBy:UserId })
    res.status(201).json({
        message: 'success',
        Docs: remainigDoc 
    })   
}


exports.GetDoc = async(req, res)=>{ 
    const DocId = req.params.DocId;
    const SearchDoc = await Doc.findById(DocId)
    console.log(SearchDoc)
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
    console.log(UpdateDoc)
    res.status(200).json({
        status: 'success',
        // Docs: UpdateDoc 
    })
}


exports.InviteFriends = async(req, res)=>{
    const DocId = req.params.DocId;
    const Arr = req.body;
    console.log(Arr)
    const UpdateDoc = await Doc.findByIdAndUpdate(DocId, {$push: {InvitedTo:Arr}})
    console.log(UpdateDoc)
    // if(Arr.length){
    //     Arr.forEach( async(element) => {
    //         await sendEmail({ 
    //             Email: element,
    //             subject: 'Join Google doc Clone', 
    //             html: `<a href='http://localhost:3000/api/doc/${DocId}'>Invite to goolge Doc</a>`
    //         }); 
    //     });
    // }
    res.status(200).json({
        status: 'success',  
        // Docs: UpdateDoc 
    })
}