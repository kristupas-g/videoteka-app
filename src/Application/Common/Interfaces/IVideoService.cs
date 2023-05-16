using Domain.Entities;

namespace Videoteka.Application.Common.Interfaces;

public interface IVideoService
{
    public Task<Stream> GetVideoStream(Video video, CancellationToken cancellationToken);

    public Task StoreVideo(Byte[] video, string videoName, CancellationToken cancellationToken);
}