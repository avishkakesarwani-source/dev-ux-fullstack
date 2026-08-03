const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const app=express();
const methodOverride=require('method-override');
const { title } = require('process');
const mongoURL="mongodb://127.0.0.1:27017/wonderlust"
const listing=require("./model/listing.js");
const ejsmate=require("ejs-mate");



main().then(res=>{console.log(res)})
.catch(err=>{console.log(err)});

async function main() {
    await mongoose.connect(mongoURL)
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("sucess");
});
app.get("/testlisting",async(req,res)=>{
let samplelisting= new listing({
    title:"My new villa",
    description:"By the Beach",
    price:1200,
    location:"Calangute,Goa",
    country:"India"
});
await samplelisting.save();
console.log("sample was saved");
res.send("success");
});

// index route
app.get("/listings",async(req,res)=>{
   const alllisting= await listing.find({});
   res.render("./listings/index.ejs",{alllisting});
});
// new route
app.get("/listings/new",(req,res)=>{
     res.render("listings/new.ejs");
});
// show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const li=await listing.findById(id);
    res.render("listings/show.ejs",{li});
});
// create route
app.post("/listings", async(req,res)=>{
    // let {title,description,price,location,country}=req.body;
    const newlisting= new listing( req.body.li);
    newlisting.save();
    res.redirect("/listings");
})
// edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const li=await listing.findById(id);
    res.render("listings/edit.ejs",{li});
});
// update route 1st one not applicable on image  but 2nd one is!
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    // const li= await listing.findById(id);
    // let {title:newtitle,description:newdescription,image:newimage,price:newprice,country:newcountry,location:newlocation}=req.body.listing;
    // li.title=newtitle;
    // li.description=newdescription;
    // li.image=newimage.url;
    // li.price=newprice;
    // li.country=newcountry;
    // li.location=newlocation;
    // await li.save();

    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedlisting=await listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
});
app.listen("8080",()=>{
    console.log("listening to the port:8080");
});