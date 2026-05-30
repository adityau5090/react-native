export const StickySection = () => (
  <View style={styles.stickyContainer}>
    <TextInput
      placeholder="Search snippets..."
      placeholderTextColor="#8A7373"
      value={search}
      onChangeText={handleSearch}
      style={styles.searchInput}
    />

    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        router.push("/snippet/create")
      }
    >
      <Text style={styles.buttonText}>
        + Create Snippet
      </Text>
    </TouchableOpacity>
  </View>
);