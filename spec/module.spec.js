/* eslint-env node, jasmine */

const fs = require('fs')
const yaml = require('js-yaml')

let redirect = require('../')

describe('express-request-redirect module', function () {

  let req, res, next

  let redirects = {
    '/url' : '/'
  }

  beforeEach(function() {
    req = jasmine.createSpyObj('req', ['url'])
    res = jasmine.createSpyObj('res', ['redirect'])
    next = jasmine.createSpy('next')
  });

  it('should expose a function', function () {
    expect(typeof redirect).toBe('function')
  })

  it('should return a middleare function when called', function () {
    expect(typeof redirect()).toBe('function')
  })

  it('should call next if no redirects argument passed in', function () {
    req.url = '/'

    redirect()(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('should call next if no match found', function () {
    req.url = '/'

    redirect(redirects)(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('should redirect the request if match found', function () {
    req.url = '/url'

    redirect(redirects)(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith(301, '/')
  })

  it("should not call next if the request has been redirected", function () {
    req.url = '/url'

    redirect(redirects)(req, res, next)
    expect(next).not.toHaveBeenCalled()
  })

  it("should load a yaml file if string passed in", function () {
    req.url = '/url'

    spyOn(fs, 'readFileSync').and.returnValue('/url: /')
    spyOn(yaml, 'safeLoad').and.callThrough()

    redirect('file.yml')(req, res, next)

    expect(fs.readFileSync).toHaveBeenCalled()
    expect(yaml.safeLoad).toHaveBeenCalled()
    expect(res.redirect).toHaveBeenCalledWith(301, '/')
  })

  it("should throw an exception of a yaml file can't be parsed", function () {
    req.url = '/url'

    spyOn(fs, 'readFileSync').and.returnValue('/url: /')
    spyOn(yaml, 'safeLoad').and.throwError('YAMLException')

    expect(function() {
      redirect('file.yml')(req, res, next)
    }).toThrowError('YAMLException');
  })

  it("should throw an exception of the file doesn't exist", function () {
    req.url = '/url'

    spyOn(fs, 'readFileSync').and.throwError('ENOENT: no such file or directory, open \'file.yml\'')
    spyOn(yaml, 'safeLoad').and.callThrough()

    expect(function() {
      redirect('file.yml')(req, res, next)
    }).toThrowError('ENOENT: no such file or directory, open \'file.yml\'');
  })
})
