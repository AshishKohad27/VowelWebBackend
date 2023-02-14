const dataModel = require("../Model/data.model");

const getData = async () => {
    try {
        let data = await dataModel.find({});
        return {
            data: data,
            length: data.length,
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

const endYearFilter = async ({ filterYear }) => {
    console.log("filterYear:", filterYear);
    try {
        let data = await dataModel.find({ end_year: filterYear });
        return {
            filter: "endYear",
            data: data,
            length: data.length,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            filter: "endYear",
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const CountryFilter = async ({ filterCountry }) => {
    console.log("filterCountry:", filterCountry);
    try {
        let data = await dataModel.find({ country: filterCountry });
        return {
            filter: "country",
            data: data,
            length: data.length,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            filter: "country",
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const CityFilter = async ({ filterCity }) => {
    console.log("filterCity:", filterCity);
    try {
        let data = await dataModel.find({ city: filterCity });
        return {
            filter: "city",
            data: data,
            length: data.length,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            filter: "city",
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const RegionFilter = async ({ filterRegion }) => {
    console.log("filterRegion:", filterRegion);
    try {
        let data = await dataModel.find({ region: filterRegion });
        return {
            filter: "region",
            data: data,
            length: data.length,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            filter: "region",
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const SectorFilter = async ({ filterSector }) => {
    console.log("filterSector:", filterSector);
    try {
        let data = await dataModel.find({ sector: filterSector });
        return {
            filter: "sector",
            data: data,
            length: data.length,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            filter: "sector",
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const TopicsFilter = async ({ filterTopic }) => {
    console.log("filterTopic:", filterTopic);
    try {
        let data = await dataModel.find({ topic: filterTopic });
        return {
            filter: "topic",
            data: data,
            length: data.length,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            filter: "topic",
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const SourceFilter = async ({ filterSource }) => {
    console.log("filterSource:", filterSource);
    try {
        let data = await dataModel.find({ source: filterSource });
        return {
            filter: "source",
            data: data,
            length: data.length,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            filter: "source",
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const PestleFilter = async ({ filterPestle }) => {
    console.log("filterPestle:", filterPestle);
    try {
        let data = await dataModel.find({ pestle: filterPestle });
        return {
            filter: "pestle",
            data: data,
            length: data.length,
            flag: true,
            message: "Getting data",
            desc: "",
        };
    } catch (e) {
        return {
            filter: "pestle",
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

module.exports = {
    getData,
    endYearFilter,
    CountryFilter,
    CityFilter,
    RegionFilter,
    SectorFilter,
    TopicsFilter,
    SourceFilter,
    PestleFilter
};
