const express=require('express');
const router=express.Router();
const DB=require('../db/db');


router.get('/notes',(req,res)=>{
    DB
    .getNotes()
    .then(notes=>{
        return res.json(notes)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

router.post('/notes',(req,res)=>{
    DB.addNote(req.body).then(notes=>res.json(notes)).
    catch(err=>res.status(500).json(err));
})

router.delete('/notes/:id',(req,res)=>{
    DB.removeNote(req.params.id).then(()=>res.json({'ok':true}))
    .catch(err=>res.status(500).json(err))
})

module.exports=router