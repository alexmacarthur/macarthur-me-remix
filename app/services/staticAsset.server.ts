import R2Service from "./r2.server";

class StaticAssetService {
  provider;

  constructor() {
    this.provider = R2Service;
  }

  get(key: string) {
    return this.provider.getFile(key);
  }

  async put(imageUrl: string, key: string): Promise<any> {
    if (await this.get(key)) {
      console.log(`Already uploaded! Skipping: ${key}`);
      return Promise.resolve();
    }

    console.log(`Uploading image: ${key}`);

    return this.provider.uploadImage({
      imageUrl,
      key,
    });
  }
}

export default new StaticAssetService();
