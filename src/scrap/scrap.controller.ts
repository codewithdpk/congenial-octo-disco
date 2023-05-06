import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { ScrapService } from './scrap.service';
import { ScrapDto, ScrapRequest } from './scrap.dto'
import { HttpError } from 'src/utils';

@Controller('scrap')
export class ScrapController {

    private readonly logger = new Logger(ScrapController.name)

    constructor(private scrapService: ScrapService) {
    }

    @Post('new')
    async scrapPage(@Body() scrapRequestObj: ScrapRequest) {

        try {
            await ScrapDto.validateAsync(scrapRequestObj);
        } catch (e) {
            this.logger.log(
                HttpStatus.PRECONDITION_FAILED,
                `Inside ${this.scrapPage.name}:Invalid Request object`,
            );
            throw HttpError(
                HttpStatus.PRECONDITION_FAILED,
                `Inside ${this.scrapPage.name}:Invalid Request object`,
            );
        }

        return this.scrapService.scrapNewUrl(scrapRequestObj)
    }
}
