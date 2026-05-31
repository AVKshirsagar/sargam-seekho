#!/bin/bash
# Download open-source harmonium audio samples for Sargam Seekho
# Run from project root: bash scripts/download-samples.sh

set -e
AUDIO_DIR="public/audio"
mkdir -p "$AUDIO_DIR"
TMP=$(mktemp -d)

echo "Downloading harmonium samples..."

echo "  Cloning DhakadG/web-harmonium (real harmonium WAV, root D4)..."
git clone --depth=1 https://github.com/DhakadG/web-harmonium.git "$TMP/dhakadg" 2>/dev/null
cp "$TMP/dhakadg/harmonium-kannan-orig.wav" "$AUDIO_DIR/harmonium-kannan.wav"
cp "$TMP/dhakadg/reverb.wav" "$AUDIO_DIR/reverb.wav"
echo "  Done: harmonium-kannan.wav + reverb.wav"

echo "  Cloning devchauhann/harmoniumweb (alternative sample)..."
git clone --depth=1 https://github.com/devchauhann/harmoniumweb.git "$TMP/devchauhann" 2>/dev/null
cp "$TMP/devchauhann/harmonium.wav" "$AUDIO_DIR/harmonium-alt.wav"
echo "  Done: harmonium-alt.wav"

rm -rf "$TMP"
echo "All done. Files in $AUDIO_DIR:"
ls -lh "$AUDIO_DIR"
