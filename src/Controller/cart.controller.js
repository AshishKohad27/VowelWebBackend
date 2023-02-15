const cartModel = require("../Model/cart.model");
const historyModel = require("../Model/history.model");
const userModel = require("../model/user.model");

const GetCart = async () => {
    try {
        let data = await cartModel.find({});
        return {
            data: data,
            length: data.length || 0,
            flag: true,
            message: "Getting Cart Item",
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

const GetUserCart = async ({ userID }) => {
    try {
        let data = await cartModel.find({ userID }).populate({ path: "userID" });

        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += data[i].price * data[i].quantity
        }
        return {

            data: data || [],
            length: data.length || 0,
            total: total.toFixed(2) || 0,
            flag: true,
            message: "Getting Cart Item",
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

const addItemInCart = async ({
    userID,
    title,
    image,
    quantity,
    price,
    mrp,
    discount,
    category,
    quantityUser,
}) => {
    try {
        let data = new cartModel({
            title,
            image,
            quantity,
            price,
            mrp,
            discount,
            category,
            quantityUser,
            userID,
        });
        await data.save();

        // let history = new historyModel({
        //     title,
        //     image,
        //     quantity,
        //     price,
        //     mrp,
        //     discount,
        //     category,
        //     quantityUser,
        //     userID,
        // });
        // await history.save();

        let user = await userModel.findByIdAndUpdate(
            { _id: userID },
            { quantity: quantityUser }
        );

        let getD = await cartModel.find({}).populate({ path: "userID" });
        return {
            data: getD,
            length: getD.length || 0,
            flag: true,
            message: "Item Added in Cart",
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

const ItemUpdateQuantity = async ({
    _id,
    title,
    image,
    quantity,
    price,
    mrp,
    discount,
    category,
}) => {
    try {
        let data = await cartModel.findByIdAndUpdate(
            { _id },
            { title, image, quantity, price, mrp, discount, category }
        );
        let getD = await cartModel.find({});
        return {
            data: getD,
            length: getD.length || 0,
            flag: true,
            message: "Item Update Successfully",
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

const updateCart = async ({ _id, quantity }) => {
    try {
        await cartModel
            .findByIdAndUpdate({ _id }, { quantity })
            .populate({ path: "userID" });
        let data = await cartModel.find();
        return {
            data: data || [],
            length: data.length || 0,
            flag: true,
            message: "Getting Cart Item",
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

const deleteCart = async ({ _id }) => {
    try {
        await cartModel.findByIdAndDelete({ _id });
        let data = await cartModel.find();
        return {
            data: data || [],
            length: data.length || 0,
            flag: true,
            message: "Getting Cart Item",
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

const placeOrderItem = async ({ userID }) => {
    try {
        let data = await cartModel.find({ userID })

        for (let i = 0; i < data.length; i++) {
            let history = new historyModel({
                title: data[i].title,
                image: data[i].image,
                quantity: data[i].quantity,
                price: data[i].price,
                mrp: data[i].mrp,
                discount: data[i].discount,
                category: data[i].category,
                quantityUser: data[i].quantity,
                userID: data[i].userID,
            });
            await history.save();
        }

        let DeleteData = await cartModel.deleteMany({ userID })
        return {
            data: DeleteData || [],
            length: DeleteData.length || 0,
            flag: true,
            message: "Getting Cart Item",
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
}

const GetHistory = async () => {
    try {
        let data = await historyModel.find({});
        return {
            data: data,
            length: data.length || 0,
            flag: true,
            message: "Getting Cart Item",
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
    GetCart,
    addItemInCart,
    ItemUpdateQuantity,
    GetUserCart,
    deleteCart,
    updateCart,
    placeOrderItem,
    GetHistory,
};
