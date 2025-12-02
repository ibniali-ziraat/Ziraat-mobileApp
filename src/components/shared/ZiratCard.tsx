
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function ZiratCard({
    onPress,
    title,
    subtitle,
    leftIcon,
    badge,
    children,
    style,
    testID
}) {
    const Wrapper = onPress ? TouchableOpacity : View;

    return (
        <Wrapper
            onPress={onPress}
            activeOpacity={0.85}
            style={[styles.cardContainer, style]}
            testID={testID}
        >
            <View style={styles.row}>
                {leftIcon ? (
                    typeof leftIcon === 'object' ? (
                        <Image source={leftIcon} style={styles.leftImage} />
                    ) : (
                        <View style={styles.leftElement}>{leftIcon}</View>
                    )
                ) : null}

                <View style={styles.meta}>
                    {title ? <Text style={styles.title}>{title}</Text> : null}
                    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
                </View>

                {badge ? (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                ) : null}
            </View>

            {/* Additional content area (children) */}
            {children ? <View style={styles.children}>{children}</View> : null}
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,               // matches tailwind rounded-xl-ish
        padding: 14,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#F0E9E9',         // card-border token
        // shadow (iOS)
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 6 },
        // elevation (Android)
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
        marginRight: 12,
        resizeMode: 'cover',
    },
    leftElement: {
        marginRight: 12
    },
    meta: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827'
    },
    subtitle: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },
    badge: {
        backgroundColor: '#F3F5F7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        alignSelf: 'flex-start'
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#111827'
    },
    children: {
        marginTop: 12
    }
});
