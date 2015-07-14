/*
 * @desription - Server unit test.
 * @copyright - 2015 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/
 * @version - v0.01
 * @license - GPLv3
 */


var assert = require('assert');

//Load 3rd party modules.
var should = require('should');

//Import first party modules.
var server_utils = require('server_utils');

//Array unit test.
describe('Encryption', function(options) {
	//Encrypt
	describe('server_utils.encrypt()', function() {
		it('should encrypt plaintext', function() {
			var plain_text = 'foobar';
			var crypt = server_utils.encrypt({plain_text: plain_text});
			
			debugger;
			crypt.should.have.property('cipher_text');
			crypt.cipher_text.should.not.equal(plain_text);
		});
		
	});

	//Decrypt
	describe('server_utils.decrypt()', function() {
		it('should decrypt the ciphertext', function() {
			var plaintext = 'hello world!';
			var paraphrase = 'D*#f00sdxfF0h%2..@df!';
			var encrypt = server_utils.encrypt({plain_text: plaintext, paraphrase: paraphrase});
			//var decrypt = server_utils.decrypt(encrypt);
			var decrypt = server_utils.decrypt({
				cipher_text: encrypt.cipher_text,
				paraphrase: paraphrase,
				iv: '81ac2cde33b2a87128ddf4746ecaeed0',
				hmac_key: 'a421dd21f790b25f958203128671dc2e3088df70ccc750e738806eb84a7a2af4'
			});
				
			decrypt.should.have.property('plain_text');
			decrypt.plain_text.should.equal(plaintext);

			//console.log("encrypt:", encrypt);
			//console.log("decrypt:", decrypt);
		});
		
	});
});

