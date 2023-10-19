const Doc = require("../RoueModel/DocModel")

exports.CreateDoc = async(req, res)=>{
    const NewDoc = new Doc({...req.body})
    await NewDoc.save();
    res.status(200).json({
        status:"success",
        message: "sucessfully created!"
      })
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
    const UserId = req.params.UserId;
    const SearchDoc = await Doc.findById(UserId)

    res.status(200).json({
        status: "success",
        Docs: SearchDoc
      })
}


exports.EditDoc = async(req, res)=>{
    const DocId = req.body;
    const DocBody = req.body.Body;
    const UpdateDoc = await Doc.findByIdAndUpdate(DocId, DocBody,{
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status: 'success',
        Docs: UpdateDoc
    })
}