const request = require('supertest');
const app = require('../index');
const Mpesa = require('../src/models/Mpesa');

describe('mpesaController', function () {
  describe('POST /stkPush', function () {
    it('responds with JSON', function (done) {
      request(app)
        .post('/stkPush')
        .send({
          amount: 100,
          phone: '0712345678',
          Order_ID: '1234567890'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          // Check that the response contains the expected keys
          assert(res.body.hasOwnProperty('MerchantRequestID'));
          assert(res.body.hasOwnProperty('CheckoutRequestID'));
          assert(res.body.hasOwnProperty('ResponseCode'));
          assert(res.body.hasOwnProperty('ResponseDescription'));
          done();
        });
    });
  });

  describe('POST /stkPushCallback/:Order_ID', function () {
    it('responds with success message and saves data to the database', function (done) {
      const mockData = {
        MerchantRequestID: '1234567890',
        CheckoutRequestID: '1234567890',
        ResultCode: 0,
        ResultDesc: 'The service was accepted.',
        CallbackMetadata: {
          Item: [
            { Name: 'Amount', Value: '100.00' },
            { Name: 'MpesaReceiptNumber', Value: 'NT28A8611O' },
            { Name: 'TransactionDate', Value: '20220316122423' },
            { Name: 'PhoneNumber', Value: '254712345678' }
          ]
        }
      };

      request(app)
        .post('/stkPushCallback/1234567890')
        .send({ Body: { stkCallback: mockData } })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          // Check that the response contains the expected keys
          assert(res.body.hasOwnProperty('Order_ID'));
          assert(res.body.hasOwnProperty('MerchantRequestID'));
          assert(res.body.hasOwnProperty('CheckoutRequestID'));
          assert(res.body.hasOwnProperty('ResultCode'));
          assert(res.body.hasOwnProperty('ResultDesc'));
          assert(res.body.hasOwnProperty('PhoneNumber'));
          assert(res.body.hasOwnProperty('Amount'));
          assert(res.body.hasOwnProperty('MpesaReceiptNumber'));
          assert(res.body.hasOwnProperty('TransactionDate'));
          // Check that the data has been saved to the database
          Mpesa.findOne({ Order_ID: '1234567890' }, function (err, data) {
            if (err) return done(err);
            assert(data);
            assert.strictEqual(data.MerchantRequestID, '1234567890');
            assert.strictEqual(data.CheckoutRequestID, '1234567890');
            assert.strictEqual(data.ResultCode, '0');
            assert.strictEqual(data.ResultDesc, 'The service was accepted.');
            assert.strictEqual(data.PhoneNumber, '254712345678');
            assert.strictEqual(data.Amount, '100.00');
            assert.strictEqual(data.MpesaReceiptNumber, 'NT28A8611O');
            assert.strictEqual(data.TransactionDate, '20220316122423');
            done();
          });
        });
    });
  });

})