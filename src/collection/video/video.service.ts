import { Video } from "./video.interface";
import { videoModel } from "./video.schema";

class VideoService {
  async getAll(): Promise<Video[] | null> {
    return videoModel.find().exec();
  }

  async create(item: Video): Promise<Video> {
    return videoModel.create(item);
  }

  async getById(id: string): Promise<Video | null> {
    return videoModel.findById(id).exec();
  }

  async delete(id: string): Promise<boolean> {
    return videoModel.deleteOne({ _id: id }).then(() => true);
  }

  async update(item: Video): Promise<Video | null> {
    return videoModel.findByIdAndUpdate(item._id, item, { new: true }).exec();
  }
}

export const videoService = new VideoService();
