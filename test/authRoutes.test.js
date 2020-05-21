import request from 'supertest';
import chai from 'chai';
import app from '../src/app.js';
import data from './data/user';
import models from '../src/database/models';

const { data1, data2, data3, data4, data5, cred1, cred2, cred3, cred4, cred5 } = data;
const { expect } = chai;

describe('Auth', () => {
    after(async () => {
        await models.sequelize.sync({ force: false });
    });
    it('should signup user', (done) => {
        request(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/json')
            .send(data1)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.message).to.equal('User signup successfully');
                done();
            }); 
    });

    it('should not signup user without firstname', (done) => {
        request(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/json')
            .send(data2)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not signup user without lastname', (done) => {
        request(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/json')
            .send(data3)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not signup user with invalid email', (done) => {
        request(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/json')
            .send(data4)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not signup user with invalid password', (done) => {
        request(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/json')
            .send(data5)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should login', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send(cred1)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('user logged in successfully');
                done();
            });
    });
    it('should not login with Incorrect email', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send(cred2)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });
    it('should not login with Incorrect password', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send(cred3)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });
    
    it('should not login with Incorrect password', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send(cred4)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it('should not login with Incorrect password', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send(cred5)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });

});
 
