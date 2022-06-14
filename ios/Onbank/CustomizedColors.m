/// Reference: https://colors.eva.design/
/// Try to use the colors from this site, the SDK colours are all based upon the "Brand color".
#import "CustomizedColors.h"

#define UIColorFromRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]

@implementation CustomizedColors : NSObject

/// Used in all backgrounds.
- (UIColor *)sdkBackground {
    return UIColorFromRGB(0xFFFFFF);
}

#pragma mark:- SDK Main tones

/// Main color, used in highlighted assets and highlighted backgrounds.
- (UIColor *)sdkPrimary {
    return UIColorFromRGB(0x39A2BB);
}

/// The following two tones should go from the primary and up in terms of lightness.
/// Be carefull with contrast, primary, secundary and tertiary must constrast with each other.
- (UIColor *)sdkSecundary {
    return UIColorFromRGB(0x3492AD);
}

- (UIColor *)sdkTertiary {
    return UIColorFromRGB(0x277084);
}

/// This is a suplementary color, can be similar to tertiary but lighter.
- (UIColor *)sdkQuaternary {
    return UIColorFromRGB(0x39A2BB);
}

/// Color for all shadows of the cards, use a darker version of the background color
- (UIColor *)shadowPrimary {
    return UIColorFromRGB(0xb8b8b8);
}

/// Main color for all completed steps, use green-like colors.
- (UIColor *)successPrimary {
    return UIColorFromRGB(0x6BAD0F);
}

/// Secundary color for all completed steps, use as the main color but lighter
- (UIColor *)successSecundary {
    return UIColorFromRGB(0xDCF69C);
}

#pragma mark:- SDK Texts

/// Highlighted texts, must contrast with background color and reference the primary color.
/// Good practice is to use the same as the primary color.
- (UIColor *)textPrimary {
    return UIColorFromRGB(0xB61515);
}

/// Texts in default state, must contrast with background color and be a neutral color (e.g. grayscales).
- (UIColor *)textSecundary {
    return UIColorFromRGB(0x0);
}

/// Texts in unselected state, must contrast with background color and be a neutral color (e.g. grayscales) but less flashy than the textSecundary.
- (UIColor *)textTerciary {
    return UIColorFromRGB(0x7a7a7a);
}

/// Texts inside buttons, must contrast with primary color.
- (UIColor *)buttonText {
    return UIColor.whiteColor;
}

/// Used in warning labels and assets.
- (UIColor *)warningPrimary {
    return UIColorFromRGB(0xC66809);
}

@end