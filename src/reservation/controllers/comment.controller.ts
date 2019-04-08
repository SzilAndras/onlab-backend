import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { Comment } from '../entities/comment.entity';
import { ReservationService } from '../services/reservation.service';

@Controller('comment')
export class CommentController {

  constructor(
    private readonly commentService: CommentService,
    private readonly reservationService: ReservationService) {}

  @Post('/saveCommentToResId=:id')
  async save(@Param('id') id: number, @Body() comment: Comment) {
    this.reservationService.findById(id).then((res) => {
      comment.reservation = res;
      this.commentService.saveComment(comment);
    });
  }

  @Get('/findCommentsResId=:id')
  async findCommentsByResId(@Param('id') id: number): Promise<Comment[]> {
    return this.commentService.findCommentsByResId(id);
  }
}