const dataModel = require("../Model/data.model");

let newPage = 1
let newLimit = 12;
const GetData = async ({ page }) => {

    try {
        let limit = 12;
        if (!page) {
            page = 1
        } else {
            newPage = page;
        }
        let data = await dataModel.find({}).limit(limit).skip((+page - 1) * limit);

        return {
            data: data,
            length: data.length || 0,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const GetDataById = async ({ _id }) => {
    try {
        let data = await dataModel.find({ _id });
        return {
            data: data,
            length: data.length || 0,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};


const AddData = async ({ image, title, price, mrp, category, quantity, discount }) => {
    try {

        let data = new dataModel({ image, title, price, mrp, category, quantity, discount });
        await data.save();

        let getD = await dataModel.find({}).limit(newLimit).skip((+newPage - 1) * newLimit);;
        return {
            data: getD,
            length: getD.length || 0,
            flag: true,
            message: "Item Added Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const EditData = async ({ _id, image, title, price, mrp, category, quantity, discount }) => {
    try {
        await dataModel.findByIdAndUpdate({ _id }, { image, title, price, mrp, category, quantity, discount });

        let getD = await dataModel.find({}).limit(newLimit).skip((+newPage - 1) * newLimit);;
        return {
            data: getD,
            length: getD.length || 0,
            flag: true,
            message: "Item Edit Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const DeleteData = async ({ _id }) => {
    try {
        await dataModel.findByIdAndDelete({ _id });
        let getD = await dataModel.find({}).limit(newLimit).skip((+newPage - 1) * newLimit);;
        return {
            data: getD,
            length: getD.length || 0,
            flag: true,
            message: "Item Delete Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};
module.exports = {
    GetData,
    AddData,
    EditData,
    DeleteData,
    GetDataById
};
