const Doc = require("../RoueModel/DocModel")

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


exports.DeleteDoc = async(req, res) => { 
    const DocId = req.params.DocId;
    await Doc.findByIdAndDelete(DocId)
    res.status(200).json({
        status: "success", 
        message:"Doc deleted!"
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