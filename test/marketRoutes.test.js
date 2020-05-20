import request from 'supertest';
import chai from 'chai';
import app from '../src/app';
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
});

