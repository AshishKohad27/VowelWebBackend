const express = require("express");
const {
  getData,
  endYearFilter,
  CountryFilter,
  CityFilter,
  RegionFilter,
  SectorFilter,
  TopicsFilter,
  SourceFilter,
  PestleFilter,
} = require("../Controller/data.controller");
const dataRoute = express();

dataRoute.get("/", async (req, res) => {
  const { data, flag, message, desc, length } = await getData();
  if (flag) {
    return res.status(201).send({ length, message, desc, data });
  } else {
    return res.status(401).send({ message, desc, data });
  }
});

dataRoute.post("/endyear", async (req, res) => {
  const { filterYear } = req.body;
  const { data, flag, message, desc, length, filter } = await endYearFilter({
    filterYear,
  });
  if (flag) {
    return res.status(201).send({ filter, length, message, desc, data });
  } else {
    return res.status(401).send({ filter, message, desc, data });
  }
});

dataRoute.post("/country", async (req, res) => {
  const { filterCountry } = req.body;
  const { data, flag, message, desc, length, filter } = await CountryFilter({
    filterCountry,
  });
  if (flag) {
    return res.status(201).send({ filter, length, message, desc, data });
  } else {
    return res.status(401).send({ filter, message, desc, data });
  }
});

dataRoute.post("/city", async (req, res) => {
  const { filterCity } = req.body;
  const { data, flag, message, desc, length, filter } = await CityFilter({
    filterCity,
  });
  if (flag) {
    return res.status(201).send({ filter, length, message, desc, data });
  } else {
    return res.status(401).send({ filter, message, desc, data });
  }
});

dataRoute.post("/region", async (req, res) => {
  const { filterRegion } = req.body;
  const { data, flag, message, desc, length, filter } = await RegionFilter({
    filterRegion,
  });
  if (flag) {
    return res.status(201).send({ filter, length, message, desc, data });
  } else {
    return res.status(401).send({ filter, message, desc, data });
  }
});

dataRoute.post("/sector", async (req, res) => {
  const { filterSector } = req.body;
  const { data, flag, message, desc, length, filter } = await SectorFilter({
    filterSector,
  });
  if (flag) {
    return res.status(201).send({ filter, length, message, desc, data });
  } else {
    return res.status(401).send({ filter, message, desc, data });
  }
});

dataRoute.post("/topic", async (req, res) => {
  const { filterTopic } = req.body;
  const { data, flag, message, desc, length, filter } = await TopicsFilter({
    filterTopic,
  });
  if (flag) {
    return res.status(201).send({ filter, length, message, desc, data });
  } else {
    return res.status(401).send({ filter, message, desc, data });
  }
});

dataRoute.post("/source", async (req, res) => {
  const { filterSource } = req.body;
  const { data, flag, message, desc, length, filter } = await SourceFilter({
    filterSource,
  });
  if (flag) {
    return res.status(201).send({ filter, length, message, desc, data });
  } else {
    return res.status(401).send({ filter, message, desc, data });
  }
});

dataRoute.post("/pestle", async (req, res) => {
  const { filterPestle } = req.body;
  const { data, flag, message, desc, length, filter } = await PestleFilter({
    filterPestle,
  });
  if (flag) {
    return res.status(201).send({ filter, length, message, desc, data });
  } else {
    return res.status(401).send({ filter, message, desc, data });
  }
});

module.exports = dataRoute;
