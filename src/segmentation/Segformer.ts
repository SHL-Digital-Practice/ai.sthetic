import axios from 'axios'

export class Segformer {
  modelName: string

  constructor(private readonly apiToken: string) {
    this.modelName = 'Xpitfire/segformer-finetuned-segments-cmp-facade'
  }

  async run(imageBuffer: Buffer) {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${this.modelName}`,
      imageBuffer,
      {
        headers: { Authorization: `Bearer ${this.apiToken}` }
      }
    )

    console.log(response)
  }
}
