using FluentValidation;

namespace Videoteka.Application.Videos.Commands.CreateVideoCommand;

public class CreateVideoCommandValidator : AbstractValidator<CreateVideoCommand>
{
    public CreateVideoCommandValidator()
    {
        RuleFor(v => v.Name).MaximumLength(48).NotEmpty();
        RuleFor(v => v.Description).MaximumLength(128);
        RuleFor(v => v.File).NotNull();
        RuleFor(v => v.File.ContentType)
            .Equal("video/mp4").WithMessage("File must be in MP4 format");
    }
}