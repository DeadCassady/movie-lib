import { AppController } from "./app.controller"
import { AppService } from "./app.service"

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(() => {
    appService = new AppService()
    appController = new AppController(appService)
  })

  describe('getHello', () => {
    it('should return a hello world', async () => {
      const result = 'test';
      jest.spyOn(appService, "getHello").mockImplementation(() => Promise.resolve(result))

      expect(await appController.getHello()).toBe(result)
    })
  })
})
