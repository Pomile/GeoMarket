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
    static async getMarketByName(req, res) {
        const { name } = req.body;
        try {
            const markets = await Market.findAll({ where: { name } });
            if (markets.length !== 0) {
                const response = new Response(
                    true,
                    200,
                    'Market(s) found successfully',
                    markets
                );
                return res.status(response.code).json(response);
            } else {
                throw new Error('Market(s) not found');
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
        // console.log(req.file);
        const filename = req.file.originalname.slice(0, req.file.originalname.length - 4);
        let imageUrl;
        try { 
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

        } catch (err) {
            console.log(err.message);
        }
        
    }

}

export default MarketController;
