import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpError } from 'src/utils';
import * as qna from '@tensorflow-models/qna'
import * as tf from '@tensorflow/tfjs-node'
import { ScrapRequest } from './scrap.dto';

@Injectable()
export class ScrapService {
    private readonly logger = new Logger(ScrapService.name)


    async scrapNewUrl(scrapRequestObj: ScrapRequest) {

        try {


            // Load the model.
            await tf.ready()
            if (qna.load) {

                const model = await qna.load();

                // Finding the answers
                return await model.findAnswers(scrapRequestObj.question, scrapRequestObj.passage);

            }
            return null

        } catch (e) {

            this.logger.log(
                HttpStatus.INTERNAL_SERVER_ERROR,
                `Inside ${this.scrapNewUrl.name}: ${e}`,
            );
            throw HttpError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                `Inside ${this.scrapNewUrl.name}:${e}`,
            );

        }


    }
}
