using Domain.Entities;

namespace Videoteka.Application.Common.Interfaces;

public interface IVideoService
{
    public Task<Stream> GetVideoStream(string name, CancellationToken cancellationToken);

    public Task StoreVideo(Stream video, string videoName);
}