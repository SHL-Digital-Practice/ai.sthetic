import axios from 'axios'
interface SegformerOutputData {
  score: number
  label: ['background', 'facade', 'window', 'blind', 'deco']
  mask: string
}

export class Segformer {
  modelName: string

  constructor(private readonly apiToken: string) {
    this.modelName = 'Xpitfire/segformer-finetuned-segments-cmp-facade'
  }

  async run(imageBuffer: Buffer): Promise<SegformerOutputData[]> {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${this.modelName}`,
      imageBuffer,
      {
        headers: { Authorization: `Bearer ${this.apiToken}` }
      }
    )

    const data: SegformerOutputData[] = response.data as SegformerOutputData[]

    return data
  }
}
