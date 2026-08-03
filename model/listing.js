const mongoose=require('mongoose');

// main().then(res=>{console.log(res)})
// .catch(err=>{console.log(err)});

// async function main() {
//     await mongoose.connect(mongoURL)
// };

// creating schema
const listingschema= mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        filename:{
            type:String,
            default:"listingimage",
        },
    url:{
        type:String,
        default:
            "https://tse1.mm.bing.net/th/id/OIP._ajHHTmB2OCkdyQi51_qvgHaEn?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        set:(v)=>
            v===""
        ?"https://tse1.mm.bing.net/th/id/OIP._ajHHTmB2OCkdyQi51_qvgHaEn?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
        :v,
    }},
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
});
const listing=mongoose.model("listing",listingschema); 
module.exports=listing;