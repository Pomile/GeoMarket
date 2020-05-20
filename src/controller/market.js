import Response from '../helpers/Response';
import db from '../database/models';

const { Market } = db;

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

}

export default MarketController;
