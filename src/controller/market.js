import Response from '../helpers/Response';
import db from '../database/models';
import uploadImage from '../helpers/imageHelper';


const { Market, MarketImage } = db;

class MarketController{
    static async addMarket(req, res) {
        const { name, category, description, street, state, country } = req.body;
        const { payload } = req.payload;
        const { id } = payload;
        try {
            const market = await Market.create({
                name,
                category,
                description,
                street,
                state,
                country,
                userId: id
            });
            if (market) {

                const response = new Response(
                    true,
                    201,
                    'Market added successfully',
                    {
                        
                        name,
                        category,
                        description,
                        street,
                        state,
                        country
                    }
                );
                return res.status(response.code).json(response);
            }
            
        } catch (err) {
            const response = new Response(
                true,
                409,
                'Ooops something wrong.'+ err.message,
                {}
            );
            return res.status(response.code).json(response);
        }
        

    }
    static async getAMarket(req, res) {
        const { marketId } = req.params;
        const market = await Market.findOne({
            where: { id: +marketId }
        });
        const images = await MarketImage.findAll({
            where: { marketId: +marketId }
        });
        
        if (market) {
            const { name,
                category,
                description,
                street,
                state,
                country } = market;
            const response = new Response(
                true,
                200,
                'Market found successfully',
                {
                    name,
                    category,
                    description,
                    street,
                    state,
                    country,
                    images
                }
            );
            return res.status(response.code).json(response);
        }
    }
    static async getMarketByName(req, res) {
        const { name } = req.body;
        try {
            const markets = await Market.findAll({ where: { name } });
            if (markets.length !== 0) {
                const response = new Response(
                    true,
                    200,
                    'Markets found successfully',
                    markets
                );
                return res.status(response.code).json(response);
            } else {
                throw new Error('Markets not found');
            }
            
        } catch (error) {
            const response = new Response(
                true,
                404,
                error.message,
            );
            return res.status(response.code).json(response);
        }
        
    }

    static async addMarketImage(req, res) {
        const { marketId } = req.params;
        const market = marketId;
        const filename = req.file.originalname.slice(0, req.file.originalname.length - 4);
        let imageUrl;
        await uploadImage(
            `uploads/${filename}_${market}.jpeg`,
            req.file,
            async (err, result) => {
                if (err) {
                    const response = new Response(
                        true,
                        404,
                        err,
                    );
                    return res.status(response.code).json(response);
                } else {
                    imageUrl = result.url;
                    
                    const marketImage = await MarketImage.create({ url: imageUrl, marketId: market });
                    const { id, url, marketId } = marketImage;
                    const response = new Response(
                        true,
                        200,
                        { id, url, marketId },
                    );
                    return res.status(response.code).json(response);
                }
            },

        );        
    }

    static async modifyMarket(req, res) {
        const { name, category, description, street, state, country } = req.body;
        const { payload } = req.payload;
        const { marketId } = req.params;
        const { id } = payload;
            Market.findByPk(+marketId).then(market => market.update({
                name,
                category,
                description,
                street,
                state,
                country,
                userId: id
            }).then((updatedMarket) => {
                const {

                    name,
                    category,
                    description,
                    street,
                    state,
                    country
                } = updatedMarket;
                const response = new Response(
                    true,
                    200,
                    'Market updated successfully',
                    {
                        name,
                        category,
                        description,
                        street,
                        state,
                        country
                   }
                );
                return res.status(response.code).json(response);
            })).catch(err => {
                const response = new Response(
                    false,
                    404,
                    'Market not found',
                );
                return res.status(response.code).json(response);
            });
            

    }

    static async removeMarket(req, res) {
        const { marketId } = req.params;
        return Market.findByPk(+marketId)
            .then(market => market.destroy())
            .then(() => res.status(204).end())
            .catch((err) => {
                res.status(404)
                    .json({
                        msg: err.message,
                    });
            });
    }


    static async removeMarketImage(req, res) {
        const { marketId } = req.params;
        const id = marketId;
        return MarketImage.findByPk(+id)
            .then(market => market.destroy())
            .then(() => res.status(204).end())
            .catch((err) => {
                res.status(404)
                    .json({
                        msg: err.message,
                    });
            });
    }
    static async getMarketsByCategory(req, res) {
        const { offset, limit, category } = req.query;
    
        const markets = await Market.findAll({
            where: { category }, offset,
            limit });
        if (markets.length !== 0) {
            const response = new Response(
                true,
                200,
                'Markets found successfully',
                markets
            );
            return res.status(response.code).json(response);
        } else {
            const response = new Response(
                false,
                404,
                'Markets not found',
            );
            return res.status(response.code).json(response);
        }
    }
}

export default MarketController;
