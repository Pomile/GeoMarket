import request from 'supertest';
import chai from 'chai';
import app from '../src/app';

const { expect } = chai;

describe('Auth', () => {
    it('should test auth route', (done) => {
        request(app)
            .get('/api/v1/auth/test')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.msg).to.equal('Thank you for testing');
                done();
            }); 
    });

});
 
