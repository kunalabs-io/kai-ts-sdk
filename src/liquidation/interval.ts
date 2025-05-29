import { Logger } from 'pino'

export abstract class Interval {
  #timeout: NodeJS.Timeout | null = null
  protected isRunning: boolean = false

  constructor(
    protected readonly intervalMs: number,
    protected readonly logger: Logger
  ) {}

  async start(startAtTheRound: boolean = false): Promise<void> {
    if (this.isRunning) {
      this.logger.error('Interval is already running')
      return
    }
    this.logger.info('Starting to poll...')

    this.isRunning = true

    const runPoll = async () => {
      if (!this.isRunning) return

      try {
        await this.poll()
      } catch (error) {
        this.logger.error(error, 'Error running poll')
      }

      // Schedule the next run
      if (this.isRunning) {
        this.#timeout = setTimeout(runPoll, this.intervalMs)
      }
    }

    // Start the first run
    const now = Date.now()
    const nextRun = startAtTheRound ? Date.now() + this.intervalMs : now
    this.logger.info(`Next run at ${new Date(nextRun).toISOString()}`)

    this.#timeout = setTimeout(runPoll, nextRun - now)
  }

  stop(): void {
    if (!this.isRunning) {
      this.logger.error('Interval is not running')
      return
    }

    this.isRunning = false
    if (this.#timeout) {
      clearTimeout(this.#timeout)
      this.#timeout = null
    }
    this.logger.info('Interval stopped')
  }

  protected abstract poll(): Promise<void>
}
