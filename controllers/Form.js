const formModel = require('../models/Form');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = {

    add: (req, res, next) => {

        console.log('@@@req body', req.body);
        const id = req.body.id;
        const unit_number = req.body.unit_number;
        const property_type = req.body.property_type;
        const category = req.body.category;
        const location = req.body.location;
        const bathrooms = req.body.bathrooms;
        const bedrooms = req.body.bedrooms;
        const furnished_type = req.body.entrance_fee;
        const listing_price = req.body.listing_price;
        const title = req.body.title;
        const description = req.body.description;



        formModel.create(
            {
                id,
                unit_number,
                property_type,
                category,
                location,
                bathrooms,
                bedrooms,
                furnished_type,
                listing_price,
                title,
                description,
            })
            .then(result => {
                console.log(result);
                res.status(200).json({
                    status: "200",
                    message: "Data Inserted Successfully",
                    data: result
                })
            })
            .catch(err => {
                console.log(err);
                if (err.code = 11000) {
                    res.json({
                        status: 11000,
                        message: 'ID Already Exist',
                        data: null
                    })
                }
                else {
                    res.json({
                        status: 202,
                        message: err,
                        data: null
                    })
                }
            })

    },

    getAll: (req, res, next) => {
        let datalist = [];

        formModel.find({}, function (err, properties) {
            if (err) {
                next(err);
            } else {
                for (let data of properties) {

                    datalist.push({
                        _id: data._id,
                        id: data.id,
                        title: data.title,
                        unit_number: data.unit_number,
                        property_type: data.property_type,
                        category: data.category,
                        location: data.location,
                        bedrooms: data.bedrooms,
                        bathrooms: data.bathrooms,
                        furnished_type: data.furnished_type,
                        listing_price: data.listing_price,
                        description: data.description,
                    });
                }
                res.json({ status: "success", message: "Data list found!!!", data: datalist });

            }

        });
    },

    getById: (req, res, next) => {
        formModel.findById(req.body.id, (err, Property_Info) => {
            if (err) {
                next(err);
            } else {
                if (Property_Info) {
                    const property_images = [];
                    Property_Info.images.forEach(image => {
                        let imageurl = req.protocol + "://" + req.headers.host + '/images/' + image;
                        property_images.push(imageurl.replace(' ', ''));
                    })
                    Property_Info.images = property_images;
                    res.json({ status: "success", message: "Property found!!!", data: { property: Property_Info } });
                } else {
                    res.json({ status: "success", message: "Property not found!!!", data: null });
                }
            }
        });
    },

    deleteById: (req, res, next) => {
        var appDir = path.dirname(process.mainModule.filename);
        tourModel.findByIdAndRemove(req.body.id,
            (err, tourInfo) => {
                if (err)
                    next(err);
                else {
                    if (tourInfo) {
                        tourInfo.tour_images.forEach(tourimage => {
                            const path = appDir + '\\images\\' + tourimage;
                            console.log(path);
                            try {
                                fs.unlinkSync(path)
                                console.log('file deleted')
                            } catch (err) {
                                console.error(err)
                            }
                        });
                        res.json({ status: "success", message: "Tour deleted successfully!!!", data: tourInfo });
                    } else {
                        res.json({ status: "success", message: "Tour is not avaliable!!!", data: tourInfo });
                    }
                }
            });
    },

    updateById: (req, res, next) => {
        const unit_number = req.body.unit_number;
        const property_type = req.body.property_type
        const category = req.body.category;
        const location = req.body.location;
        const bathrooms = req.body.bathrooms;
        const bedrooms = req.body.bedrooms;
        const furnished_type = req.body.furnished_type;
        const listing_price = req.body.listing_price;
        const title = req.body.title;
        const description = req.body.description;

        formModel.findOneAndUpdate({ id: req.body.id },
            {
                unit_number,
                property_type,
                category,
                location,
                bathrooms,
                bedrooms,
                furnished_type,
                listing_price,
                title,
                description,

            },
            (err, Property_Info) => {

                if (err)
                    next(err);
                else {
                    res.json({ status: "success", message: "Property updated successfully!!!", data: Property_Info });
                }
            });
    },

}