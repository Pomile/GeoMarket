import request from 'supertest';
import chai from 'chai';
import app from '../src/app';

const { expect } = chai;

describe('Market', () => {
   
    it('should test market route', (done) => {
        request(app)
            .get('/api/v1/market/test')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.msg).to.equal('Thank you for testing');
                done();
            });
    });
});

