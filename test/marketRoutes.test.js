import request from 'supertest';
import chai from 'chai';
import nock from 'nock';
import app from '../src/app.js';
import data from './data/market';

const { expect } = chai;
const { market1, market2, market3, market4, market5, market6, market7, admin } = data;
let adminToken;
describe('Market', () => {
    it('should login as admin', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send(admin)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('user logged in successfully');
                const { token } = res.body.data.user;
                adminToken = token;
                done();
            });
    });

    it('should add a market', (done) => {
        request(app)
            .post('/api/v1/markets')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .send(market1)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.message).to.equal('Market added successfully');
                done();
            });
    });

    it('should get markets', (done) => {
        request(app)
            .get('/api/v1/markets')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .send({name: 'Alamutu'})
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Markets found successfully');
                done();
            });
    });
    it('should get markets with category and location', (done) => {
        request(app)
            .get('/api/v1/markets/category_location?category=food&location=lagos, nigeria&limit=20&offset=0')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Markets found successfully');
                done();
            });
    });
    it('should not get markets with zero limit', (done) => {
        request(app)
            .get('/api/v1/markets/category_location?category=food&location=lagos, nigeria&limit=0&offset=0')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not get markets with invalid offset', (done) => {
        request(app)
            .get('/api/v1/markets/category_location?category=food&location=lagos, nigeria&limit=0&offset=ghgsjgs')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not get markets with market category that does not exist', (done) => {
        request(app)
            .get('/api/v1/markets/category_location?category=fabrician&location=lagos, nigeria&limit=0&offset=0')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not get markets with invalid location', (done) => {
        request(app)
            .get('/api/v1/markets/category_location?category=food&location=lagos nigeria&limit=0&offset=0')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should get markets with category and location', (done) => {
        request(app)
            .get('/api/v1/markets/name_location?name=Alamutu&location=lagos, nigeria&limit=20&offset=0')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Markets found successfully');
                done();
            });
    });
    it('should not get markets with zero limit', (done) => {
        request(app)
            .get('/api/v1/markets/name_location?name=Alamutu&location=lagos, nigeria&limit=0&offset=0')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not get markets with invalid offset', (done) => {
        request(app)
            .get('/api/v1/markets/name_location?name=Alamutu&location=lagos, nigeria&limit=0&offset=ghgsjgs')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not get markets with market category that does not exist', (done) => {
        request(app)
            .get('/api/v1/markets/name_location?name=Alamutu&location=lagos, nigeria&limit=0&offset=0')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not get markets with invalid location', (done) => {
        request(app)
            .get('/api/v1/markets/name_location?name=Alamutu&location=lagos nigeria&limit=0&offset=0')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should get market by category', (done) => {
        request(app)
            .get('/api/v1/markets/category?category=food&limit=10&offset=0')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.length).to.equal(1);
                done();
            });
    });
    it('should not get market by category with invalid limit', (done) => {
        request(app)
            .get('/api/v1/markets/category?category=food&limit=ytyety&offset=0')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not get market by category with invalid offset', (done) => {
        request(app)
            .get('/api/v1/markets/category?category=food&limit=12&offset=shgshgs')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not get market with category that does not exist', (done) => {
        request(app)
            .get('/api/v1/markets/category?category=foof&limit=12&offset=0')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
    });

    it('should get markets without name', (done) => {
        request(app)
            .get('/api/v1/markets')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.data.name).to.equal('name is required and must not be less than two characters');
                done();
            });
    });
    it('should not get markets with name that does exist', (done) => {
        request(app)
            .get('/api/v1/markets')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .send({ name: 'Alamutuz' })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.message).to.equal('Markets not found');
                done();
            });
    });
    it('should add market image', (done) => {
        const scope = nock('https://api.cloudinary.com/v1_1')
            .post('/pomile/image/upload')
            .reply(200, {
                public_id: 'sample',
                version: '1312461204',
                format: 'jpg',
                resource_type: 'image',
                url: 'http://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
                secure_url: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
                signature: 'abcdefgc024acceb1c1baa8dca46717137fa5ae0c3',
                original_filename: 'sample',
            });
        request(app)
            .post('/api/v1/markets/1')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .attach('file', `${__dirname}/data/jesus31.jpg`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message.url).to.equal('http://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg');
                done();
            });
    });
    it('should not add market image', (done) => {
        request(app)
            .post('/api/v1/markets/1')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .attach('file', null)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equal('Unsupported image type');
                done();
            });
    });
    it('should update a market', (done) => {
        request(app)
            .patch('/api/v1/markets/3')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .send(market1)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Market updated successfully');
                done();
            });
    });
    it('should not update a market with invalid id', (done) => {
        request(app)
            .patch('/api/v1/markets/jjjj')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .send(market1)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equal('Invalid id.id must be a positive integer and greater than 0.');
                done();
            });
    });
    it('should get a market', (done) => {
        request(app)
            .get('/api/v1/markets/3')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.images.length).to.equal(0);
                done();
            });
    });
    it('should remove a market', (done) => {
        request(app)
            .delete('/api/v1/markets/3')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .end((err, res) => {
                expect(res.status).to.equal(204);
                done();
            });
    });
    it('should not remove a market with id that does not exist', (done) => {
        request(app)
            .delete('/api/v1/markets/30')
            .set('Accept', 'application/json')
            .set({ Authorization: adminToken })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
    });

    
});

